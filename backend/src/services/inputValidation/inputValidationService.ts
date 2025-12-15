/**
 * @summary
 * Business logic for Input Validation.
 * Implements centralized validation controller with priority-based error handling.
 *
 * @module services/inputValidation/inputValidationService
 */

import { ServiceError } from '@/utils';
import {
  ValidationState,
  PriorityMap,
  ValidationResponse,
  TextValidationRequest,
  MorseValidationRequest,
  SequenceValidationRequest,
  StateUpdateRequest,
} from './inputValidationTypes';
import {
  textValidationSchema,
  morseValidationSchema,
  sequenceValidationSchema,
  stateUpdateSchema,
} from './inputValidationValidation';
import { SUPPORTED_CHARACTERS } from '@/constants/morseTranslator';

/**
 * Priority map for error resolution
 */
const PRIORITY_MAP: PriorityMap = {
  1: 'limite_caracteres',
  2: 'sequencia_invalida',
  3: 'caractere_invalido',
};

/**
 * Maximum character limit
 */
const MAX_CHARACTERS = 1000;

/**
 * Allowed characters for text field (A-Z, 0-9, space, and 22 special characters)
 */
const TEXT_ALLOWED_CHARS = /^[A-Za-z0-9 .,?'!\/()&:;=+\-_"$@]*$/;

/**
 * Allowed characters for morse field (dot, dash, space, pipe)
 */
const MORSE_ALLOWED_CHARS = /^[.\-\s|]*$/;

/**
 * Central validation state (in-memory)
 */
let validationState: ValidationState = {
  componentes: {
    'FC-001': {
      ativo: false,
      ultimo_erro: '',
      timestamp: 0,
    },
    'FC-002': {
      ativo: false,
      ultimo_erro: '',
      timestamp: 0,
    },
    'FC-003': {
      ativo: false,
      ultimo_erro: '',
      timestamp: 0,
    },
  },
  erro_ativo: null,
};

/**
 * @summary
 * Updates validation state for a component.
 *
 * @function updateValidationState
 * @module services/inputValidation
 *
 * @param {StateUpdateRequest} request - State update parameters
 * @returns {ValidationState} Updated validation state
 *
 * @example
 * const state = updateValidationState({
 *   componentId: 'FC-001',
 *   hasError: true,
 *   errorMessage: 'Limite máximo de 1000 caracteres atingido',
 *   errorPriority: 1,
 *   timestamp: Date.now()
 * });
 */
function updateValidationState(request: StateUpdateRequest): ValidationState {
  const { componentId, hasError, errorMessage, errorPriority, timestamp } = request;

  // Update component state
  validationState.componentes[componentId as keyof typeof validationState.componentes] = {
    ativo: hasError,
    ultimo_erro: errorMessage,
    timestamp,
  };

  // Resolve active error based on priority and timestamp
  const activeErrors = Object.entries(validationState.componentes)
    .filter(([_, state]) => state.ativo)
    .map(([id, state]) => ({
      componente_id: id,
      tipo: state.ultimo_erro,
      prioridade: errorPriority,
      timestamp: state.timestamp,
    }));

  if (activeErrors.length === 0) {
    validationState.erro_ativo = null;
  } else {
    // Sort by priority (ascending), then by timestamp (descending)
    activeErrors.sort((a, b) => {
      if (a.prioridade !== b.prioridade) {
        return a.prioridade - b.prioridade;
      }
      return b.timestamp - a.timestamp;
    });

    validationState.erro_ativo = activeErrors[0];
  }

  return validationState;
}

/**
 * @summary
 * Validates text field input.
 *
 * @function validateTextField
 * @module services/inputValidation
 *
 * @param {unknown} body - Raw request body to validate
 * @returns {Promise<ValidationResponse>} Validation result
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails validation
 *
 * @example
 * const result = await validateTextField({ text: 'Hello World', currentLength: 11 });
 * // Returns: { valid: true, errorCode: null, errorMessage: null, errorPriority: null, timestamp: 1234567890 }
 */
export async function validateTextField(body: unknown): Promise<ValidationResponse> {
  const validation = textValidationSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const { text, currentLength } = validation.data;
  const timestamp = Date.now();

  // Check character limit (Priority 1)
  if (currentLength >= MAX_CHARACTERS) {
    updateValidationState({
      componentId: 'FC-001',
      hasError: true,
      errorMessage: 'Limite máximo de 1000 caracteres atingido',
      errorPriority: 1,
      timestamp,
    });

    return {
      valid: false,
      errorCode: 'LIMIT_REACHED',
      errorMessage: 'Limite máximo de 1000 caracteres atingido',
      errorPriority: 1,
      timestamp,
    };
  }

  // Check for invalid characters (Priority 3)
  if (!TEXT_ALLOWED_CHARS.test(text)) {
    const invalidChar = text.split('').find((char) => !TEXT_ALLOWED_CHARS.test(char));

    updateValidationState({
      componentId: 'FC-001',
      hasError: true,
      errorMessage: 'Este caractere não é suportado para tradução Morse',
      errorPriority: 3,
      timestamp,
    });

    return {
      valid: false,
      errorCode: 'INVALID_CHARACTER',
      errorMessage: 'Este caractere não é suportado para tradução Morse',
      errorPriority: 3,
      timestamp,
    };
  }

  // Clear error state if validation passed
  updateValidationState({
    componentId: 'FC-001',
    hasError: false,
    errorMessage: '',
    errorPriority: 3,
    timestamp,
  });

  return {
    valid: true,
    errorCode: null,
    errorMessage: null,
    errorPriority: null,
    timestamp,
  };
}

/**
 * @summary
 * Validates morse field input.
 *
 * @function validateMorseField
 * @module services/inputValidation
 *
 * @param {unknown} body - Raw request body to validate
 * @returns {Promise<ValidationResponse>} Validation result
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails validation
 *
 * @example
 * const result = await validateMorseField({ morseCode: '... --- ...', currentLength: 11 });
 * // Returns: { valid: true, errorCode: null, errorMessage: null, errorPriority: null, timestamp: 1234567890 }
 */
export async function validateMorseField(body: unknown): Promise<ValidationResponse> {
  const validation = morseValidationSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const { morseCode, currentLength } = validation.data;
  const timestamp = Date.now();

  // Check character limit (Priority 1)
  if (currentLength >= MAX_CHARACTERS) {
    updateValidationState({
      componentId: 'FC-002',
      hasError: true,
      errorMessage: 'Limite máximo de 1000 caracteres atingido',
      errorPriority: 1,
      timestamp,
    });

    return {
      valid: false,
      errorCode: 'LIMIT_REACHED',
      errorMessage: 'Limite máximo de 1000 caracteres atingido',
      errorPriority: 1,
      timestamp,
    };
  }

  // Check for invalid characters (Priority 3)
  if (!MORSE_ALLOWED_CHARS.test(morseCode)) {
    updateValidationState({
      componentId: 'FC-002',
      hasError: true,
      errorMessage: 'Apenas pontos (.), traços (-), espaços e barras verticais (|) são permitidos',
      errorPriority: 3,
      timestamp,
    });

    return {
      valid: false,
      errorCode: 'INVALID_CHARACTER',
      errorMessage: 'Apenas pontos (.), traços (-), espaços e barras verticais (|) são permitidos',
      errorPriority: 3,
      timestamp,
    };
  }

  // Clear error state if validation passed
  updateValidationState({
    componentId: 'FC-002',
    hasError: false,
    errorMessage: '',
    errorPriority: 3,
    timestamp,
  });

  return {
    valid: true,
    errorCode: null,
    errorMessage: null,
    errorPriority: null,
    timestamp,
  };
}

/**
 * @summary
 * Validates morse code sequence structure.
 *
 * @function validateMorseSequence
 * @module services/inputValidation
 *
 * @param {unknown} body - Raw request body to validate
 * @returns {Promise<ValidationResponse>} Validation result
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When body fails validation
 *
 * @example
 * const result = await validateMorseSequence({ sequence: '... --- ...' });
 * // Returns: { valid: true, errorCode: null, errorMessage: null, errorPriority: null, timestamp: 1234567890 }
 */
export async function validateMorseSequence(body: unknown): Promise<ValidationResponse> {
  const validation = sequenceValidationSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const { sequence } = validation.data;
  const timestamp = Date.now();

  // Check for multiple consecutive spaces (Priority 2)
  if (/\s{2,}/.test(sequence)) {
    updateValidationState({
      componentId: 'FC-003',
      hasError: true,
      errorMessage: 'Não são permitidos espaços consecutivos no código Morse',
      errorPriority: 2,
      timestamp,
    });

    return {
      valid: false,
      errorCode: 'MULTIPLE_SPACES',
      errorMessage: 'Não são permitidos espaços consecutivos no código Morse',
      errorPriority: 2,
      timestamp,
    };
  }

  // Check for consecutive pipes (Priority 2)
  if (/\|{2,}/.test(sequence)) {
    updateValidationState({
      componentId: 'FC-003',
      hasError: true,
      errorMessage: 'Não são permitidas barras verticais consecutivas',
      errorPriority: 2,
      timestamp,
    });

    return {
      valid: false,
      errorCode: 'CONSECUTIVE_PIPES',
      errorMessage: 'Não são permitidas barras verticais consecutivas',
      errorPriority: 2,
      timestamp,
    };
  }

  // Check for pipe at start or end (Priority 2)
  if (/^\||\|$/.test(sequence.trim())) {
    updateValidationState({
      componentId: 'FC-003',
      hasError: true,
      errorMessage: 'Barra vertical não pode estar no início ou fim',
      errorPriority: 2,
      timestamp,
    });

    return {
      valid: false,
      errorCode: 'PIPE_AT_BOUNDARY',
      errorMessage: 'Barra vertical não pode estar no início ou fim',
      errorPriority: 2,
      timestamp,
    };
  }

  // Check for spaces adjacent to pipes (Priority 2)
  if (/\s\||\|\s/.test(sequence)) {
    updateValidationState({
      componentId: 'FC-003',
      hasError: true,
      errorMessage: 'Não são permitidos espaços antes ou depois de barras verticais',
      errorPriority: 2,
      timestamp,
    });

    return {
      valid: false,
      errorCode: 'SPACE_ADJACENT_PIPE',
      errorMessage: 'Não são permitidos espaços antes ou depois de barras verticais',
      errorPriority: 2,
      timestamp,
    };
  }

  // Clear error state if validation passed
  updateValidationState({
    componentId: 'FC-003',
    hasError: false,
    errorMessage: '',
    errorPriority: 2,
    timestamp,
  });

  return {
    valid: true,
    errorCode: null,
    errorMessage: null,
    errorPriority: null,
    timestamp,
  };
}

/**
 * @summary
 * Gets current validation state.
 *
 * @function getValidationState
 * @module services/inputValidation
 *
 * @returns {Promise<ValidationState>} Current validation state
 *
 * @example
 * const state = await getValidationState();
 * // Returns: { componentes: {...}, erro_ativo: {...} }
 */
export async function getValidationState(): Promise<ValidationState> {
  return validationState;
}
