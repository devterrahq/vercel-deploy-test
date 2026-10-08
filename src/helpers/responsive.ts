import type { BreakpointList, SBResponsiveField } from '@/types';

export const generalResponsiveFieldToClassName = (
  responsiveField: SBResponsiveField | undefined,
  cb: (value: string | undefined, breakpoint: string | undefined, prefix: string | undefined) => string | null,
  prefix?: string,
) => {
  if (!responsiveField?.fieldValue) return null;

  const breakpoints = Object.keys(responsiveField.fieldValue) as BreakpointList;
  if (!breakpoints.length) return null;

  let className = '';
  for (let i = 0; i < breakpoints.length; i++) {
    const breakpoint = breakpoints[i] === 'default' ? '' : breakpoints[i];
    const value = responsiveField.fieldValue[breakpoints[i]].value?.toString();
    const cbClassName = cb(value, breakpoint, prefix);

    cbClassName && (className += `${cbClassName}`);

    if (i < breakpoints.length - 1 && cbClassName) className += ' ';
  }

  return className;
};
