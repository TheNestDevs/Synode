package com.example.frontend_flutter

//import io.flutter.embedding.android.FlutterActivity

import android.os.Build
import androidx.annotation.RequiresApi
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import java.net.NetworkInterface

class MainActivity : FlutterActivity() {
    private val CHANNEL = "samples.flutter.dev/macAddress"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        MethodChannel(
            flutterEngine.dartExecutor.binaryMessenger,
            CHANNEL
        ).setMethodCallHandler { call, result ->
            if (call.method == "getMacAddress") {
                val macAddress = getMacAddress()
                if (macAddress != null) {
                    result.success(macAddress)
                } else {
                    result.error("UNAVAILABLE", "MAC address not available.", null)
                }
            } else {
                result.notImplemented()
            }
        }
    }

    private fun getMacAddress(): String? {
        try {
            val all = NetworkInterface.getNetworkInterfaces().toList()
            for (nif in all) {
                if (!nif.name.equals("wlan0", ignoreCase = true)) continue

                val macBytes = nif.hardwareAddress ?: return null
                val mac = StringBuilder()
                for (b in macBytes) {
                    mac.append(String.format("%02X:", b))
                }
                if (mac.isNotEmpty()) {
                    mac.deleteCharAt(mac.length - 1)
                }
                return mac.toString()
            }
        } catch (ex: Exception) {
            ex.printStackTrace()
        }
        return null
    }
}