interface ImportMetaEnv {
    readonly VITE_APP_ENV : String
    readonly VITE_FIREBASE_API_KEY : String
    readonly VITE_FIREBASE_AUTH_DOMAIN : String
    readonly VITE_FIREBASE_PROJECT_ID : String
    readonly VITE_FIREBASE_STORAGE_BUCKEY : String
    readonly VITE_FIREBASE_MEASSAGING_SENDER_ID : String
    readonly VITE_FIREBASE_APP_ID : String
    readonly VITE_MEASSUREMENT_ID : String
    readonly VITE_STRIPE_PUBLIC_KEY : String
    readonly VITE_STRIPE_SECRET_KEY : String
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}