# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:


# Branch
-dontwarn io.branch.**
-keep class com.google.android.gms.ads.identifier.** { *; } # Google ads user identifier

# JNI
-keep class com.facebook.jni.** { *; }

# SVG issue
-keep public class com.horcrux.svg.** {*;}

# Turbo modules
-keep class com.facebook.react.turbomodule.** { *; }
