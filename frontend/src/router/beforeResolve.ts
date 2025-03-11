import { getAuthToken } from '@/services/auth.service'
import type { NavigationGuardWithThis } from 'vue-router'

const beforeResolve: NavigationGuardWithThis<undefined> = (to, from, next) => {
  if (to.path !== '/auth' && !getAuthToken()) {
    next('/auth')
  } else if (to.path === '/auth' && getAuthToken()) {
    next(from.path)
  } else {
    next()
  }
}

export default beforeResolve
