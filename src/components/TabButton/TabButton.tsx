import { FC, PropsWithChildren } from 'react'
import classnames from 'classnames'

import './TabButton.scss'

type TabButtonProps = {
  /**
   * The indicator of activity the tab.
   * If true the tab has pink background. Otherwise, the tab has purple background.
   */
  isActive: boolean
  /**
   * The function which is used on click of the tab.
   */
  onClick: () => void
  /**
   * The class which is used in the tab.
   */
  className?: string
  /**
   * Disabled status of the button.
   * @default undefined which means the button is not disabled
   */
  disabled?: boolean
}

export const TabButton: FC<PropsWithChildren<TabButtonProps>> = ({ isActive, onClick, className = '', children, disabled = false }) => {
  // Needed because a user can change 'disable' attribute by manually in devtools
  // and do action from the function.
  // For greater security, we can programmatically check this.
  const onInternalClick = () => {
    if (!disabled) {
      onClick()
    }
  }
  return (
    <button disabled={disabled} onClick={onInternalClick} type='button' className={classnames('tab-button', className, {
      'tab-button--active': isActive,
    })}>
      {children}
    </button>
  )
}
