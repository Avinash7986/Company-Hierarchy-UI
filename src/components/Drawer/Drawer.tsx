import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { FiXCircle } from 'react-icons/fi'
import './drawer.css'

interface IDrawer {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

function createPortalRoot() {
  const drawerRoot = document.createElement('div')
  drawerRoot.setAttribute('id', 'drawer-root')
  return drawerRoot
}

const Drawer = ({ isOpen, onClose, children }: IDrawer) => {
  const portalRootRef = useRef(
    document.getElementById('drawer-root') || createPortalRoot()
  )

  useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])

  useEffect(() => {
    document.body.appendChild(portalRootRef.current)
    const portal = portalRootRef.current
    return () => {
      portal.remove()
    }
  }, [])

  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keyup', onKeyPress)
    }

    return () => {
      window.removeEventListener('keyup', onKeyPress)
    }
  }, [isOpen, onClose])

  return createPortal(
    <div
      aria-hidden={isOpen ? 'false' : 'true'}
      className={`drawer-container ${isOpen ? 'open' : ''}`}
    >
      <div className={`drawer right`} role='dialog'>
        <div className='close-icon'>
          <FiXCircle onClick={onClose} />
        </div>

        {children}
      </div>
      <div className='backdrop' onClick={onClose} />
    </div>,
    portalRootRef.current
  )
}

export default Drawer
