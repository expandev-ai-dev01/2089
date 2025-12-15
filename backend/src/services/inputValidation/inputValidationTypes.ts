/**
 * @summary
 * Type definitions for Input Validation service.
 *
 * @module services/inputValidation/inputValidationTypes
 */

/**
 * @interface ValidationState
 * @description Central validation state structure
 *
 * @property {object} componentes - Individual component validation states
 * @property {object} componentes.FC-001 - Text field validation state
 * @property {boolean} componentes.FC-001.ativo - Whether text field has active error
 * @property {string} componentes.FC-001.ultimo_erro - Last error message for text field
 * @property {number} componentes.FC-001.timestamp - Timestamp of last error (Date.now())
 * @property {object} componentes.FC-002 - Morse field validation state
 * @property {boolean} componentes.FC-002.ativo - Whether morse field has active error
 * @property {string} componentes.FC-002.ultimo_erro - Last error message for morse field
 * @property {number} componentes.FC-002.timestamp - Timestamp of last error (Date.now())
 * @property {object} componentes.FC-003 - Sequence validation state
 * @property {boolean} componentes.FC-003.ativo - Whether sequence validation has active error
 * @property {string} componentes.FC-003.ultimo_erro - Last error message for sequence
 * @property {number} componentes.FC-003.timestamp - Timestamp of last error (Date.now())
 * @property {object|null} erro_ativo - Currently active error with highest priority
 * @property {string} erro_ativo.componente_id - Component ID that triggered error
 * @property {string} erro_ativo.tipo - Error type identifier
 * @property {number} erro_ativo.prioridade - Error priority (1=highest)
 * @property {number} erro_ativo.timestamp - Timestamp when error was detected
 */
export interface ValidationState {
  componentes: {
    'FC-001': {
      ativo: boolean;
      ultimo_erro: string;
      timestamp: number;
    };
    'FC-002': {
      ativo: boolean;
      ultimo_erro: string;
      timestamp: number;
    };
    'FC-003': {
      ativo: boolean;
      ultimo_erro: string;
      timestamp: number;
    };
  };
  erro_ativo: {
    componente_id: string;
    tipo: string;
    prioridade: number;
    timestamp: number;
  } | null;
}

/**
 * @interface PriorityMap
 * @description Error priority mapping
 *
 * @property {string} 1 - Priority 1: Character limit reached
 * @property {string} 2 - Priority 2: Invalid sequence
 * @property {string} 3 - Priority 3: Invalid character
 */
export interface PriorityMap {
  1: 'limite_caracteres';
  2: 'sequencia_invalida';
  3: 'caractere_invalido';
}

/**
 * @interface TextValidationRequest
 * @description Request payload for text field validation
 *
 * @property {string} text - Text to validate
 * @property {number} currentLength - Current character count
 */
export interface TextValidationRequest {
  text: string;
  currentLength: number;
}

/**
 * @interface MorseValidationRequest
 * @description Request payload for morse field validation
 *
 * @property {string} morseCode - Morse code to validate
 * @property {number} currentLength - Current character count
 */
export interface MorseValidationRequest {
  morseCode: string;
  currentLength: number;
}

/**
 * @interface SequenceValidationRequest
 * @description Request payload for morse sequence validation
 *
 * @property {string} sequence - Morse sequence to validate
 */
export interface SequenceValidationRequest {
  sequence: string;
}

/**
 * @interface ValidationResponse
 * @description Response structure for validation operations
 *
 * @property {boolean} valid - Whether input is valid
 * @property {string|null} errorCode - Error code if validation failed
 * @property {string|null} errorMessage - Error message if validation failed
 * @property {number|null} errorPriority - Error priority if validation failed
 * @property {number} timestamp - Timestamp of validation (Date.now())
 */
export interface ValidationResponse {
  valid: boolean;
  errorCode: string | null;
  errorMessage: string | null;
  errorPriority: number | null;
  timestamp: number;
}

/**
 * @interface StateUpdateRequest
 * @description Request payload for updating validation state
 *
 * @property {string} componentId - Component identifier (FC-001, FC-002, FC-003)
 * @property {boolean} hasError - Whether component has error
 * @property {string} errorMessage - Error message
 * @property {number} errorPriority - Error priority
 * @property {number} timestamp - Timestamp of error
 */
export interface StateUpdateRequest {
  componentId: string;
  hasError: boolean;
  errorMessage: string;
  errorPriority: number;
  timestamp: number;
}
