import { computed, Injectable, signal } from "@angular/core";
import { createBrowserClient } from "@supabase/ssr";

@Injectable({
  providedIn: 'root',
})
export class SupabaseAuthService {
  private supabase = createBrowserClient(import.meta.env['VITE_SUPABASE_DATABASE_URL'], import.meta.env['VITE_SUPABASE_ANON_KEY']);
  private session = signal<unknown>(null);
  readonly loggedIn = computed(() => !!this.session());

  constructor() {
    this.refresh();

    this.supabase.auth.onAuthStateChange((_event) => {
      this.refresh();
    });
  }

  getSession() {
    return this.supabase.auth.getSession();
  }

  async logout() {
    await this.supabase.auth.signOut();
  }

  async login(email: string, password: string) {
    await this.supabase.auth.signInWithPassword({ email, password });
    this.refresh();
  }

  refresh() {
    this.getSession().then(({ data: { session } }) => {
      this.session.set(session);
    });
  }
}