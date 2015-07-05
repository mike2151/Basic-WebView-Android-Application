package com.wordpress.httpstheredefiningproductions.dangersofewaste;

import android.app.Activity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebView;


public class MainActivity extends Activity {
    WebView webview;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        webview = (WebView) findViewById(R.id.webView);
        webview.getSettings().setJavaScriptEnabled(true);
        //webview.getSettings().setLoadWithOverviewMode(true);
        // webview.getSettings().setUseWideViewPort(true);s
        webview.setInitialScale(100);
        // webview.setScrollBarStyle(WebView.SCROLLBARS_OUTSIDE_OVERLAY);
        // webview.setScrollbarFadingEnabled(false);
        webview.loadUrl("file:///android_asset/overview.html");
        webview.getSettings().setBuiltInZoomControls(true);



    }



}
