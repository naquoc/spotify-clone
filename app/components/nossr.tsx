import dynamic from "next/dynamic";
import React, { FC } from "react";

const NoSSR: FC<any> = (props) => (
  <React.Fragment>{props.children}</React.Fragment>
)

export default dynamic(() => Promise.resolve(NoSSR), { ssr: false })

