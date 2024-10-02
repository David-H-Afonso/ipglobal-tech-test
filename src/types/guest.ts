export interface GuestData {
	guest: Guest
	error?: string
}

export interface Guest {
	success: boolean
	guest_session_id: string
	expires_at: Date
}
