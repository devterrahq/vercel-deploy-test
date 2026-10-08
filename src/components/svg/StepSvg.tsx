import type { SvgProps } from '@/types';

type StepSvgProps = SvgProps & {
  step: string;
};
export function StepSvg({ step, width = 55, height = 64, color = '#253746', ...rest }: StepSvgProps) {
  return (
    <svg width={width} height={height} viewBox='0 0 55 64' fill='none' xmlns='http://www.w3.org/2000/svg' {...rest}>
      <path d='M55 48.001V15.999L27.5 0L0 15.999V48.001L27.5 64L55 48.001Z' fill={color} />
      <text x={step.length < 2 ? '21' : '15'} y='40' className='step-svg-text'>
        {step}
      </text>
    </svg>
  );
}
