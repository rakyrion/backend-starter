import { MongoError } from 'mongodb'
import { IErrorTranslation } from '../../../app/interfaces/errorTranslation'
import { BadRequestError } from '../../../app/errors/badRequest'
import { InternalServerError } from '../../../app/errors/internalServer'

const translate = (errorTranslation: IErrorTranslation) => {
	if (errorTranslation.original instanceof MongoError) {
		if (errorTranslation.original.code === 11000) {
			const [ , errorCollection ] = errorTranslation.original.message.split(':')
			const [ , collectionWithDB ] = errorCollection.split('.')
			const [collection] = collectionWithDB.split(' ')
			const [ , errorString ] = errorTranslation.original.message.split('dup key: { ')
			const [field] = errorString.split(':')
			
			errorTranslation.translated = new BadRequestError(
				'',
				undefined,
				{ document: 'already exists', field, collection }
			)
			return
		}

		log.error('Uncaught mongodb error encountered.', 'database', errorTranslation.original)
		errorTranslation.translated = new InternalServerError(errorTranslation.original)
	}
}

events.subscribe(
	'expressGlobalErrorHandlerTranslation',
	errorTranslation => translate(errorTranslation as IErrorTranslation)
)
