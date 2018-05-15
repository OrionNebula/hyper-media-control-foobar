import { registerSubPlugin } from 'hyper-plugin-extend'
import { HyperMediaFoobar } from './HyperMediaFoobar'

export const onRendererWindow = registerSubPlugin('hyper-media-control', HyperMediaFoobar)
