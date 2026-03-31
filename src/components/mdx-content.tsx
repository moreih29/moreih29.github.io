import * as runtime from 'react/jsx-runtime'
import { type ComponentProps, type ElementType } from 'react'
import { ClickableImage } from './image-modal'

const sharedComponents = {
  img: ClickableImage,
}

function interceptJsx(
  jsxFn: typeof runtime.jsx,
): typeof runtime.jsx {
  return function (type: ElementType | string, props: ComponentProps<ElementType>, key?: string) {
    if (type === 'img') {
      return jsxFn(ClickableImage, props as ComponentProps<typeof ClickableImage>, key)
    }
    return jsxFn(type as ElementType, props, key)
  } as typeof runtime.jsx
}

const interceptedRuntime = {
  ...runtime,
  jsx: interceptJsx(runtime.jsx),
  jsxs: interceptJsx(runtime.jsxs),
}

const useMDXComponent = (code: string) => {
  const fn = new Function(code)
  return fn({ ...interceptedRuntime }).default
}

interface MDXContentProps {
  code: string
  components?: Record<string, React.ComponentType>
}

export function MDXContent({ code, components }: MDXContentProps) {
  const Component = useMDXComponent(code)
  return <Component components={{ ...sharedComponents, ...components }} />
}
