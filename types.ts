
export enum StyleType {
  PROFESSIONAL = '专业正式',
  FRIENDLY = '亲切自然',
  EMPATHETIC = '感同身受',
  CONCISE = '简洁明了',
  HUMOROUS = '幽默风趣',
  PERSUASIVE = '有说服力'
}

export interface ScriptOption {
  id: string;
  content: string;
  style: StyleType;
}

export interface GenerationRequest {
  originalText: string;
  style: StyleType;
  context?: string;
}

export interface AppState {
  input: string;
  selectedStyle: StyleType;
  context: string;
  results: ScriptOption[];
  isLoading: boolean;
  error: string | null;
}
