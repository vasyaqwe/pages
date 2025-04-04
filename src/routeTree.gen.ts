/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SettingsImport } from './routes/settings'
import { Route as IndexImport } from './routes/index'
import { Route as NoteNoteIdImport } from './routes/note.$noteId'

// Create/Update Routes

const SettingsRoute = SettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const NoteNoteIdRoute = NoteNoteIdImport.update({
  id: '/note/$noteId',
  path: '/note/$noteId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/settings': {
      id: '/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof SettingsImport
      parentRoute: typeof rootRoute
    }
    '/note/$noteId': {
      id: '/note/$noteId'
      path: '/note/$noteId'
      fullPath: '/note/$noteId'
      preLoaderRoute: typeof NoteNoteIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/settings': typeof SettingsRoute
  '/note/$noteId': typeof NoteNoteIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/settings': typeof SettingsRoute
  '/note/$noteId': typeof NoteNoteIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/settings': typeof SettingsRoute
  '/note/$noteId': typeof NoteNoteIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/settings' | '/note/$noteId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/settings' | '/note/$noteId'
  id: '__root__' | '/' | '/settings' | '/note/$noteId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  SettingsRoute: typeof SettingsRoute
  NoteNoteIdRoute: typeof NoteNoteIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  SettingsRoute: SettingsRoute,
  NoteNoteIdRoute: NoteNoteIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/settings",
        "/note/$noteId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/settings": {
      "filePath": "settings.tsx"
    },
    "/note/$noteId": {
      "filePath": "note.$noteId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
