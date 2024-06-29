import 'package:frontend_flutter/src/app/service_locator/supabase_service.dart';
import 'package:get_it/get_it.dart';

var sl = GetIt.instance;

Future<void> serviceLocator() async {
  await _initSupabase();
}

Future<void> _initSupabase() async {
  await SupabaseService.init();
  sl.registerSingleton<SupabaseService>(SupabaseService());
}
