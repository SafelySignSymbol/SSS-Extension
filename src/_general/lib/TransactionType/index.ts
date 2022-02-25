import { TransactionType } from 'symbol-sdk'

export const getTransactionType = (type: TransactionType) => {
  switch (type) {
    case TransactionType.ACCOUNT_ADDRESS_RESTRICTION:
      return 'ACCOUNT_ADDRESS_RESTRICTION'
    case TransactionType.ACCOUNT_KEY_LINK:
      return 'ACCOUNT_KEY_LINK'
    case TransactionType.ACCOUNT_METADATA:
      return 'ACCOUNT_METADATA'
    case TransactionType.ACCOUNT_MOSAIC_RESTRICTION:
      return 'ACCOUNT_MOSAIC_RESTRICTION'
    case TransactionType.ACCOUNT_OPERATION_RESTRICTION:
      return 'ACCOUNT_OPERATION_RESTRICTION'
    case TransactionType.ADDRESS_ALIAS:
      return 'ADDRESS_ALIAS'
    case TransactionType.AGGREGATE_BONDED:
      return 'AGGREGATE_BONDED'
    case TransactionType.AGGREGATE_COMPLETE:
      return 'AGGREGATE_COMPLETE'
    case TransactionType.HASH_LOCK:
      return 'HASH_LOCK'
    case TransactionType.MOSAIC_ADDRESS_RESTRICTION:
      return 'MOSAIC_ADDRESS_RESTRICTION'
    case TransactionType.MOSAIC_ALIAS:
      return 'MOSAIC_ALIAS'
    case TransactionType.MOSAIC_DEFINITION:
      return 'MOSAIC_DEFINITION'
    case TransactionType.MOSAIC_GLOBAL_RESTRICTION:
      return 'MOSAIC_GLOBAL_RESTRICTION'
    case TransactionType.MOSAIC_METADATA:
      return 'MOSAIC_METADATA'
    case TransactionType.MOSAIC_SUPPLY_CHANGE:
      return 'MOSAIC_SUPPLY_CHANGE'
    case TransactionType.MOSAIC_SUPPLY_REVOCATION:
      return 'MOSAIC_SUPPLY_REVOCATION'
    case TransactionType.MULTISIG_ACCOUNT_MODIFICATION:
      return 'MULTISIG_ACCOUNT_MODIFICATION'
    case TransactionType.NAMESPACE_METADATA:
      return 'NAMESPACE_METADATA'
    case TransactionType.NAMESPACE_REGISTRATION:
      return 'NAMESPACE_REGISTRATION'
    case TransactionType.NODE_KEY_LINK:
      return 'NODE_KEY_LINK'
    case TransactionType.RESERVED:
      return 'RESERVED'
    case TransactionType.SECRET_LOCK:
      return 'SECRET_LOCK'
    case TransactionType.SECRET_PROOF:
      return 'SECRET_PROOF'
    case TransactionType.TRANSFER:
      return 'TRANSFER'
    case TransactionType.VOTING_KEY_LINK:
      return 'VOTING_KEY_LINK'
    case TransactionType.VRF_KEY_LINK:
      return 'VRF_KEY_LINK'
    default:
      return 'NOT FOUND'
  }
}
