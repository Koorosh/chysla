import * as React from 'react'

interface TooltipProps {
  content: string;
  style: any
}

const Tooltip: React.SFC<TooltipProps> = ({style = {}, content}) => (
  <div className='tooltip' style={style}>
    {content}
  </div>
)

export default Tooltip
