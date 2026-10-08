import type { SvgProps } from '@/types';

export function ChevronRightSvg({ color = '#253746', width = 7, height = 12, ...rest }: SvgProps): JSX.Element {
  return (
    <svg width={width} height={height} viewBox='0 0 7 12' fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
      <path
        d='M6.55283 5.24295L1.77314 0.314094C1.36702 -0.104698 0.710986 -0.104698 0.304868 0.314094C-0.10125 0.732885 -0.10125 1.4094 0.304868 1.82819L4.34522 6.00537L0.304867 10.1718C-0.10125 10.5906 -0.10125 11.2671 0.304867 11.6859C0.710985 12.1047 1.36702 12.1047 1.77314 11.6859L6.55283 6.75705C6.95895 6.34899 6.95895 5.66174 6.55283 5.24295Z'
        fill={color}
      />
    </svg>
  );
}
