export interface ValidationResult {
  valid: boolean;
  errorCode: string | null;
  errorMessage: string | null;
  errorPriority: number | null;
  timestamp: number;
}

export interface ComponentValidationState {
  ativo: boolean;
  ultimo_erro: string;
  timestamp: number;
}

export interface ActiveError {
  componente_id: string;
  tipo: string;
  prioridade: number;
  timestamp: number;
}

export interface ValidationState {
  componentes: {
    'FC-001': ComponentValidationState;
    'FC-002': ComponentValidationState;
    'FC-003': ComponentValidationState;
  };
  erro_ativo: ActiveError | null;
}
