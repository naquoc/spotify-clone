import type {
  NextComponentType,
  NextPageContext,
  NextLayoutComponent,
} from 'next'
import type { AppProps } from 'next/app'

declare module 'next' {
  type NextLayoutComponent<P = {}> = NextComponentType<NextPageContext, any, P> & {
    authPage?: boolean
  }
}

declare module 'next/app' {
  type AppLayoutProps<P = {}> = AppProps & {
    Component: NextLayoutComponent
  }
}
