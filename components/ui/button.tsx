import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'group/button inline-flex shrink-0 items-center justify-center gap-2',
    'whitespace-nowrap font-semibold tracking-tight select-none',
    'transition-all outline-none rounded-full overflow-hidden relative',
    'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#E9FF00]',
    'disabled:pointer-events-none disabled:opacity-40',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
    /* Shine sweep */
    'before:absolute before:inset-0 before:bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.07)_50%,transparent_60%)]',
    'before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-400',
  ].join(' '),
  {
    variants: {
      variant: {
        /* Acid yellow — primary CTA */
        default: [
          'bg-[#E9FF00] text-[#050816]',
          'hover:bg-[#F2FF4D] hover:-translate-y-0.5',
          'hover:shadow-[0_0_40px_rgba(233,255,0,0.25)]',
          'active:translate-y-0 active:shadow-[0_0_20px_rgba(233,255,0,0.15)]',
        ].join(' '),

        /* Glass — secondary */
        secondary: [
          'bg-[rgba(14,22,40,0.40)] text-white',
          'border border-[rgba(255,255,255,0.08)]',
          'backdrop-blur-md',
          'hover:bg-[rgba(14,22,40,0.65)] hover:border-[rgba(255,255,255,0.16)] hover:-translate-y-0.5',
          'active:translate-y-0',
        ].join(' '),

        /* Outline — accent border */
        outline: [
          'bg-transparent text-[#E9FF00]',
          'border border-[rgba(233,255,0,0.35)]',
          'hover:bg-[rgba(233,255,0,0.08)] hover:border-[rgba(233,255,0,0.75)]',
          'hover:shadow-[0_0_20px_rgba(233,255,0,0.20)] hover:-translate-y-0.5',
          'active:translate-y-0',
        ].join(' '),

        /* Ghost — minimal */
        ghost: [
          'bg-transparent text-[#A7B0C5]',
          'hover:bg-[rgba(255,255,255,0.05)] hover:text-white',
        ].join(' '),

        /* Destructive */
        destructive: [
          'bg-red-500/10 text-red-400',
          'border border-red-500/20',
          'hover:bg-red-500/20 hover:border-red-500/40',
        ].join(' '),

        /* Text link */
        link: 'text-[#E9FF00] underline-offset-4 hover:underline rounded-none before:hidden',
      },
      size: {
        xs:      'h-7  px-3.5 text-xs',
        sm:      'h-8  px-4   text-xs',
        default: 'h-10 px-5   text-sm',
        lg:      'h-12 px-7   text-base',
        xl:      'h-14 px-9   text-lg',
        '2xl':   'h-16 px-11  text-xl',
        icon:    'size-10 p-0',
        'icon-sm': 'size-8 p-0',
        'icon-lg': 'size-12 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
