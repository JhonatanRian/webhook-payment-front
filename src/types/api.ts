export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface PaginationParams {
  page?: number;
  size?: number;
}

export interface ApiErrorResponse {
  error?: string;
  code?: string;
  detail?: string;
  request_id?: string;
}

export interface HealthCheckResponse {
  status: 'ok' | 'healthy' | 'degraded' | 'error';
  version?: string;
  timestamp?: string;
  database?: boolean;
}
