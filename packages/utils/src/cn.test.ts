import { describe, it, expect } from 'vitest';

import { cn } from './cn.js';

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    expect(cn('p-4', 'm-2')).toBe('p-4 m-2');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const isHidden = false;
    expect(cn('base-class', isActive && 'conditional-class')).toBe('base-class conditional-class');
    expect(cn('base-class', isHidden && 'conditional-class')).toBe('base-class');
  });

  it('handles object syntax', () => {
    expect(
      cn({
        'class-1': true,
        'class-2': false,
        'class-3': true,
      })
    ).toBe('class-1 class-3');
  });

  it('handles arrays', () => {
    expect(cn(['class-1', 'class-2'], 'class-3')).toBe('class-1 class-2 class-3');
  });

  it('removes duplicate classes', () => {
    expect(cn('p-4', 'p-4')).toBe('p-4');
  });

  it('handles undefined and null values', () => {
    expect(cn('class-1', undefined, null, 'class-2')).toBe('class-1 class-2');
  });

  it('prioritizes later conflicting classes', () => {
    expect(cn('text-red-500', 'text-blue-500', 'text-green-500')).toBe('text-green-500');
  });

  it('handles empty inputs', () => {
    expect(cn()).toBe('');
    expect(cn('')).toBe('');
  });

  it('handles complex Tailwind conflicts', () => {
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
    expect(cn('p-4', 'px-2 py-1')).toBe('p-4 px-2 py-1');
  });
});
