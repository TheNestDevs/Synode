import 'package:supabase_flutter/supabase_flutter.dart';

import '../../../env/env.dart';

class SupabaseService {
  SupabaseClient get client => Supabase.instance.client;

  static Future<void> init() async {
    await Supabase.initialize(
      url: Env.supabaseUrl,
      anonKey: Env.supabaseAnonKey,
    );
  }
}
