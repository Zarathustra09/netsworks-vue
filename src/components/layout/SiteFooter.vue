<script setup>
const year = new Date().getFullYear();
</script>

<template>
    <footer class="bg-base-200/50 border-t border-base-300 py-16">
        <div class="container mx-auto px-6">
            <div class="grid md:grid-cols-4 gap-8">
                <div>
                    <div class="flex items-center gap-2 mb-6">
                        <img src="/images/logo.svg" alt="Netsworks Logo" class="w-16 h-16" />
                        <span class="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Netsworks</span>
                    </div>
                    <p class="text-base-content/70">Precision electronics fabrication for the future.</p>
                </div>

                <div>
                    <h4 class="text-lg font-semibold mb-4">Services</h4>
                    <ul class="space-y-2 text-base-content/70">
                        <li><RouterLink :to="{ name: 'services' }" class="link link-hover">General Fabrication</RouterLink></li>
                        <li><RouterLink :to="{ name: 'services' }" class="link link-hover">PCB Design/Assembly</RouterLink></li>
                        <li><RouterLink :to="{ name: 'services' }" class="link link-hover">Board Repair/Plating</RouterLink></li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-lg font-semibold mb-4">Company</h4>
                    <ul class="space-y-2 text-base-content/70">
                        <li><RouterLink :to="{ name: 'about' }" class="link link-hover">About</RouterLink></li>
                        <li><RouterLink :to="{ name: 'about', hash: '#contact' }" class="link link-hover">Contact</RouterLink></li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-lg font-semibold mb-4">Connect</h4>
                    <div class="flex gap-3">
                        <a href="#" class="btn btn-circle btn-sm bg-base-100 hover:bg-primary hover:text-primary-content shadow-md border-none" aria-label="Twitter">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                        </a>
                        <a href="#" class="btn btn-circle btn-sm bg-base-100 hover:bg-primary hover:text-primary-content shadow-md border-none" aria-label="LinkedIn">
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div class="border-t border-base-300 mt-12 pt-8 text-center text-base-content/60">
                <p>&copy; {{ year }} Netsworks. All rights reserved.</p>
            </div>
        </div>
    </footer>
</template>
