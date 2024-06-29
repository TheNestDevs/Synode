import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  static const Color accentColor = Color(0xFF540804);

  static ThemeData theme = ThemeData(
    fontFamily: GoogleFonts.epilogue().fontFamily,
    textTheme: TextTheme(
      displayLarge: GoogleFonts.epilogue(
        fontSize: 68,
        fontWeight: FontWeight.w500,
        color: Colors.white,
      ),
      displayMedium: GoogleFonts.epilogue(
        fontSize: 32,
        fontWeight: FontWeight.w500,
        color: Colors.white,
      ),
      displaySmall: GoogleFonts.epilogue(
        fontSize: 26,
        fontWeight: FontWeight.w500,
        color: Colors.white,
      ),
      labelLarge: GoogleFonts.epilogue(
        fontSize: 28,
        fontWeight: FontWeight.w500,
        color: Colors.white,
      ),
      labelMedium: GoogleFonts.epilogue(
        fontSize: 26,
        fontWeight: FontWeight.w500,
        color: Colors.white,
      ),
      labelSmall: GoogleFonts.epilogue(
        fontSize: 20,
        fontWeight: FontWeight.w500,
        color: Colors.white,
      ),
    ),
  );
}
