import dynamic from "next/dynamic";
import { FC } from "react";

const NoSSR: FC<any> = ({ children }) => (
  <div>{children}</div>
)

export default dynamic(() => Promise.resolve(NoSSR), { ssr: false })

