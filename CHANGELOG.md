Changelog
----

## release 1.0.2

- added context.done() call in case this is needed exclusively in deployment
- (hotfix) ipfs url had extra slash in response payload

## release 1.0.1

- an empty buffer still has a size, so a minimum body length was specified
- the generic 500 error wrapper now includes a stacktrace
- error copy now reads from appropriate error copy file

## release 1.0

- initial build
- added pin option
- disabled pin (investigation indicated that added files are automatically pinned)
- downgraded ipfs-utils to 9.0.2 due to [issue 169](https://github.com/ipfs/js-ipfs-utils/issues/169), [issue 173](https://github.com/ipfs/js-ipfs-utils/issues/173)
- refactored everything