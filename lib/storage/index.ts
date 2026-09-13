export interface StorageProvider{createSignedUpload(input:{key:string;contentType:string;visibility:'PUBLIC'|'PRIVATE'}):Promise<{uploadUrl:string;key:string}>;delete(key:string):Promise<void>}
export class S3StorageProvider implements StorageProvider{
  async createSignedUpload(input:{key:string;contentType:string;visibility:'PUBLIC'|'PRIVATE'}):Promise<{uploadUrl:string;key:string}>{throw new Error('TODO: configure S3-compatible signer');}
  async delete(_key:string):Promise<void>{throw new Error('TODO: configure S3 delete');}
}
