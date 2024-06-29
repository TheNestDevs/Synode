import 'package:flutter/services.dart';

class MacAddress {
  static const platform = MethodChannel('samples.flutter.dev/macAddress');

  Future<String?> getMacAddress() async {
    try {
      final String result = await platform.invokeMethod('getMacAddress');
      return result;
    } on PlatformException catch (e) {
      print("Failed to get MAC address: '${e.message}'.");
      return null;
    }
  }
}
