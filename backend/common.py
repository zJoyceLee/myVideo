SITES = {
    'youku': 'youku'
}

import json
import getopt

fake_headers = {
    'Accept': 'text/html, application/xhtml+xml, application/xml; q=0.9, */*; q=0.8',
    'Accept-Charset': 'UTF-8, *; q=0.5',
    'Accept-Encoding': 'gzip, deflate, sdch',
    'Accept-Language': 'en-US, en; q=0.8',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36'
}


def trans_e(a, c):
    """str, str->str
    This is an RC4 encryption."""
    f = h = 0
    b = list(range(256))
    result = ''
    while h < 256:
        f = (f + b[h] + ord(a[h % len(a)])) % 256
        b[h], b[f] = b[f], b[h]
        h += 1
    q = f = h = 0
    while q < len(c):
        h = (h + 1) % 256
        f = (f + b[h]) % 256
        b[h], b[f] = b[f], b[h]
        if isinstance(c[q], int):
            result += chr(c[q] ^ b[(b[h] + b[f]) % 256])
        else:
            result += chr(ord(c[q]) ^ b[(b[h] + b[f]) % 256])
        q += 1

    return result
