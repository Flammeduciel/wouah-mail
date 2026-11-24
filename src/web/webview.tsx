/**
 * Web build stand-in for `react-native-webview` (no web support): the mail HTML
 * runs in a sandboxed iframe (scripts allowed, no access to the app's origin).
 * The same `window.ReactNativeWebView.postMessage` bridge is provided, links
 * open in a new tab, and `injectJavaScript` goes through `postMessage`.
 */

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { View } from 'react-native';

let counter = 0;

interface Props {
  source?: { html?: string; uri?: string };
  injectedJavaScript?: string;
  onMessage?: (event: { nativeEvent: { data: string } }) => void;
  style?: unknown;
  testID?: string;
}

export const WebView = forwardRef(function WebView(props: Props, ref) {
  const id = useMemo(() => `wv${++counter}`, []);
  const frame = useRef<HTMLIFrameElement | null>(null);
  const { onMessage } = props;

  useImperativeHandle(ref, () => ({
    injectJavaScript: (code: string) => {
      frame.current?.contentWindow?.postMessage({ __wvEval: id, code }, '*');
    },
  }));

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      const data = event.data as { __wv?: string; data?: string } | null;
      if (data && data.__wv === id) onMessage?.({ nativeEvent: { data: data.data ?? '' } });
    };
    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, [id, onMessage]);

  const bridge =
    '<base target="_blank">' +
    `<script>window.ReactNativeWebView={postMessage:function(d){parent.postMessage({__wv:'${id}',data:d},'*')}};` +
    `window.addEventListener('message',function(e){if(e.data&&e.data.__wvEval==='${id}'){(0,eval)(e.data.code)}});</script>`;
  const html = props.source?.html;
  const withBridge = html
    ? /<head[^>]*>/i.test(html)
      ? html.replace(/<head[^>]*>/i, (head) => `${head}${bridge}`)
      : `${bridge}${html}`
    : undefined;
  const srcDoc = withBridge
    ? `${withBridge}<script>window.addEventListener('DOMContentLoaded',function(){${props.injectedJavaScript ?? ''}});</script>`
    : undefined;

  return (
    <View style={[{ flex: 1 }, props.style as object]} testID={props.testID}>
      <iframe
        ref={frame}
        title="Message"
        sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
        srcDoc={srcDoc}
        src={html ? undefined : props.source?.uri}
        style={{ border: 0, width: '100%', height: '100%' }}
      />
    </View>
  );
});

export default WebView;
export type WebViewMessageEvent = { nativeEvent: { data: string } };
export type WebViewNavigation = { url: string };
