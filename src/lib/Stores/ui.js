import { writable } from 'svelte/store'

export let hideTopSpace = writable(false)
export let hideBottomMenu = writable(false)
export let hideIntroOverflow = writable(false)
export let hideGradient = writable(false)
export let theme = writable('dark')