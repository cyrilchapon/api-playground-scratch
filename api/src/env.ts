import * as envalid from 'envalid'

const knownNodeEnv = ['development', 'production', 'test'] as const

type KnownNodeEnv = typeof knownNodeEnv[number]

interface AppEnv {
  NODE_ENV: KnownNodeEnv
  PORT: number
  DATABASE_URL: string
}

const getAppEnv = (env: NodeJS.ProcessEnv = process.env): AppEnv => {
  const cleanedEnv = envalid.cleanEnv<AppEnv>(env, {
    NODE_ENV: envalid.str({ choices: knownNodeEnv }),
    PORT: envalid.port(),
    DATABASE_URL: envalid.url()
  })

  /* eslint-disable @typescript-eslint/consistent-type-assertions */
  return { ...cleanedEnv } as AppEnv & envalid.CleanedEnvAccessors
}

const appEnv = getAppEnv()

export { appEnv, getAppEnv }
export type {
  AppEnv,
  KnownNodeEnv
}
