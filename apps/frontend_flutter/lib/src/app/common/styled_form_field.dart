import 'package:flutter/material.dart';

import '../theme/theme.dart';

class StyledFormField extends StatelessWidget {
  final String label;
  final Widget? icon;
  final TextEditingController? controller;
  final bool? obscureText;
  final String? Function(String?)? validator;

  const StyledFormField({
    super.key,
    required this.label,
    this.icon,
    this.controller,
    this.obscureText = false,
    this.validator,
  });

  InputBorder getBorder() {
    return OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
      borderSide: const BorderSide(
        color: Colors.black87,
        width: 2,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      obscureText: obscureText ?? false,
      validator: validator,
      style: TextStyle(color: Colors.white),
      decoration: InputDecoration(
        contentPadding: const EdgeInsets.all(12),
        prefixIcon: icon,
        labelText: label,
        labelStyle: AppTheme.theme.textTheme.labelMedium,
        enabledBorder: getBorder(),
        focusedBorder: getBorder(),
        errorBorder: getBorder(),
      ),
    );
  }
}
