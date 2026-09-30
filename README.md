# FWERKOR Homepage

Official static homepage for [FWERKOR](https://www.fwerkor.com).

The site is intentionally framework-free: semantic HTML, CSS, and a small amount of JavaScript for scroll motion and appearance preferences.

## Design

- cinematic scroll-driven hero treatment without external animation libraries;
- sticky and progressive content sections;
- responsive light/dark/auto appearance;
- `prefers-reduced-motion` fallback;
- no external fonts, trackers, analytics, or frontend runtime dependencies;
- concise service directory instead of marketing-heavy copy.

## Local preview

```bash
python3 -m http.server 8080
```

## Deployment

The production deployment is a static Nginx service. See `deploy/nginx.conf`.


### Production updates

The production homepage container polls main about once per minute and switches validated releases atomically. No GitHub-side server credentials are required because this repository is public.

## License

MIT
