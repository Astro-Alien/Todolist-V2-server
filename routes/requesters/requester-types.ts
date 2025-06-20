/**
 * This file defines the types/interface used in the requester module.
 */

/**
 * @interface IHeaders - Interface representing the headers of an API request.
 * @property {string} [Authorization] - Optional authorization token for the request.
 * @property {string} [Content-Type] - Optional content type of the request, typically 'application/json'.
 */
interface IHeaders {
    Authorization?: string;
    'Content-Type'?: string;
}

/**
 * @interface IApiRequest - Interface representing an API request.
 * @property {Data} body - The body of the request, which is an object of type Data.
 * @property {IHeaders} headers - The headers of the request, adhering to the IHeaders interface.
 * @param {Data} Data - A generic type parameter representing the structure of the request body.
 */
export interface IApiRequest<Data extends object> {
   body: Data,
   headers: IHeaders
}
