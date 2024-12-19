interface ImportMetaEnv {
    readonly VITE_APP_ENV : string
    readonly VITE_FIREBASE_API_KEY : string
    readonly VITE_FIREBASE_AUTH_DOMAIN : string
    readonly VITE_FIREBASE_PROJECT_ID : string
    readonly VITE_FIREBASE_STORAGE_BUCKEY : string
    readonly VITE_FIREBASE_MEASSAGING_SENDER_ID : string
    readonly VITE_FIREBASE_APP_ID : string
    readonly VITE_MEASSUREMENT_ID : string
    readonly VITE_STRIPE_PUBLIC_KEY : string
    readonly VITE_STRIPE_SECRET_KEY : string
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}