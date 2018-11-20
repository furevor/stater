import { Action } from '../assets/action.interface';
import { MonoTypeOperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

export function ofType<T extends Action>(type: string): MonoTypeOperatorFunction<T> {
  return filter((action) => type === action.type);
}
