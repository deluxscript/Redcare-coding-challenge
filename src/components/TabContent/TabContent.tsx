import { FC, PropsWithChildren } from 'react'
import classnames from 'classnames'

/**
 * Interface defining the props for a tab content component.
 */
type TabContentProps = {
  /**
   * The class which is used in the tab content.
   */
  className?: string
}

export const TabContent: FC<PropsWithChildren<TabContentProps>> = ({ children, className }) => {
  return (
      <div className={classnames('tab-content', className)}>
        {children}
      </div>
    )
}
