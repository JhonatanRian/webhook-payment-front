export type SchedulerMode = 'once' | 'recurring';

export interface SchedulerStatus {
  scheduled_cycles_completed: number;
  manual_triggers_completed: number;
  max_cycles: number;
  interval_minutes: number;
  remaining_cycles: number;
  mode: SchedulerMode;
  is_running: boolean;
  next_run_time: string | null;
}

export interface ChangeModeRequest {
  mode: SchedulerMode;
}

export interface TriggerCycleResponse {
  message: string;
  cycle_type: 'manual';
  status: string;
}

export interface ResetSchedulerResponse {
  message: string;
  status: string;
}
