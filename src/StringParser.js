import { findInObject, nothing } from '../lib/findInObject';
import { compose } from 'functional-programming-utilities';

const nextArgument = (_, p) => p;
const validateHex = (str) => /^[A-F0-9]{8}/i.test(str) ? str : nothing;
const stringParser = (template) => (data) => (template || nothing).replace(/\{\{\s?([^\{\} ]*)\s?\}\}/g, compose(nextArgument, validateHex, findInObject(data)));

export default { nextArgument, validateHex, stringParser };