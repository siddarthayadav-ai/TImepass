import { useState } from 'react'
import {
  AppsecProvider,
  OnboardingStepper,
  RBACManagement,
  RbacQueryProvider,
} from 'appsec-ui'

type View = 'onboarding' | 'management'

export default function App() {
  const [view, setView] = useState<View>('management')
  const [done, setDone] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="flex items-center gap-5 border-b border-slate-200 bg-white px-8 py-3">
        <span className="text-sm font-semibold text-slate-800">
          appsec-ui sandbox
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setView('onboarding')}
            className={`rounded-md px-3 py-1 text-sm transition-colors ${
              view === 'onboarding'
                ? 'bg-blue-50 font-medium text-blue-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Onboarding
          </button>
          <button
            onClick={() => setView('management')}
            className={`rounded-md px-3 py-1 text-sm transition-colors ${
              view === 'management'
                ? 'bg-blue-50 font-medium text-blue-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Management
          </button>
        </div>
      </nav>

      <div className="flex justify-center px-6 py-10 sm:px-8">
        <AppsecProvider
          appId="TestApp"
          baseUrl="https://local-cw-appsec.techo.camp/granularApi"
          appsecUrl="https://dev-cw-appsec.techo.camp"
          mode={view === 'onboarding' ? 'create' : 'manage'}
          getAuthToken={() =>
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWRjYmUwYjdjNzdhM2ZiY2FiZjljYzkiLCJlbWFpbCI6InNpZGRhcnRoYS55YWRhdkB0ZWNob2x1dGlvbi5jb20iLCJmaXJzdG5hbWUiOiJTaWRkYXJ0aGEiLCJsYXN0bmFtZSI6IllhZGF2Iiwicm9sZSI6WyI2ODk5YzMzYWU5ZmQ0MWYzZjkwOGVkZDAiXSwiZGVwYXJ0bWVudHMiOltdLCJvcmdhbml6YXRpb24iOltdLCJzdGF0dXMiOiJBQ1RJVkUiLCJyZXNldF90b2tlbiI6bnVsbCwiZ3JvdXBzIjpbXSwiY3JlYXRlZEF0IjoiMjAyNi0wNC0xM1QwOTo1NzozMS41MDNaIiwiam9pbmVkT24iOiIyMDI2LTA0LTEzVDA5OjU3OjMxLjUwM1oiLCJjb25uZWN0b3JNYXAiOnt9LCJ1c2VyVmFsaWRpdHkiOiIyMTI2LTAzLTIwVDA5OjU3OjMxLjUwNloiLCJyb2xlbmFtZSI6WyJPcmcgVXNlciJdLCJpYXQiOjE3Nzg3NzU1MTksImV4cCI6MTc3ODk0ODMxOX0.9Tf1VzIZJhFLlwVKbV9okyNB8SBCTQv7YcomQEbX5gc'
          }
          roleTemplates={[
            {
              id: 'tpl-admin',
              name: 'Admin',
              level: 'admin',
              description: 'Full access',
              suggestedPermissions: ['read', 'write', 'delete', 'admin'],
            },
            {
              id: 'tpl-editor',
              name: 'Editor',
              level: 'editor',
              description: 'Read + write',
              suggestedPermissions: ['read', 'write'],
            },
            {
              id: 'tpl-viewer',
              name: 'Viewer',
              level: 'viewer',
              description: 'Read only',
              suggestedPermissions: ['read'],
            },
          ]}
        >
          <RbacQueryProvider>
            {view === 'onboarding' && (
              <div className="w-full max-w-[860px] rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_32px_rgba(15,23,42,0.06)] sm:p-8">
                {done ? (
                  <div className="py-16 text-center">
                    <p className="text-2xl font-bold text-slate-800">
                      Onboarding complete!
                    </p>
                    <button
                      className="mt-4 text-sm text-blue-600 underline"
                      onClick={() => setDone(false)}
                    >
                      Reset
                    </button>
                  </div>
                ) : (
                  <OnboardingStepper
                    className="w-full"
                    onComplete={() => setDone(true)}
                  />
                )}
              </div>
            )}

            {view === 'management' && (
              <div className="w-full max-w-[860px] rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_32px_rgba(15,23,42,0.06)] sm:p-8">
                <div className="mb-6">
                  <h1 className="text-[2rem] font-bold tracking-[-0.02em] text-slate-900">
                    Access Management
                  </h1>
                  <p className="mt-2 text-sm text-slate-500">
                    Manage users, roles, and groups for Demo App.
                  </p>
                </div>
                <RBACManagement className="w-full" />
              </div>
            )}
          </RbacQueryProvider>
        </AppsecProvider>
      </div>
    </div>
  )
}
