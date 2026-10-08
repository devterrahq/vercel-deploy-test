import type { SvgProps } from '@/types';

export function TimesSvg({ color = '#ffffff', width = 31, height = 31, ...rest }: SvgProps): JSX.Element {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 31 31' fill='none' {...rest}>
      <path
        d='M31 3.60483L27.3952 0L15.5 11.8952L3.60483 0L0 3.60483L11.8952 15.5L0 27.3952L3.60483 31L15.5 19.1048L27.3952 31L31 27.3952L19.1048 15.5L31 3.60483Z'
        fill={color}
      />
    </svg>
  );
}
