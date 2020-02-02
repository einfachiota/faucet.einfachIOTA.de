import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export const i18n = new VueI18n({
	locale: 'de',
	fallbackLocale: 'en',
	messages: {
		en: {
			headline: 'IOTA Devnet Faucet',
			subheadline: 'Simply send IOTA',
			iota_is_free: 'IOTA is feeless!',
			tx_on_thetangle: 'Watch transaction on',
			get_free_iota: 'Get your free IOTA!',
			how_it_works: 'How does the faucet work?',
			available_tokens: 'Available Tokens:',
			fill: 'Fill the Faucet',
			spend_iota: 'Spend IOTA',
			transaction_address: 'You can follow the transaction at',
			transaction_address1: '.',
			transaction_sent: 'Transaction sent:',
			data_without_token: 'Data can be sent without the possession of IOTA token!',
			form: {
				address_label: 'address',
				amount: 'amount',
				message: 'Message',
				message_placeholder: 'Message (optional)',
			},
			about: {
				heading: 'The IOTA faucet explained',
				subheading: 'Simply send IOTA tokens!',
				faucetlink: 'Faucet Code on Github.',
				modulelink1: 'The ',
				modulelink2: 'iota-payment module ',
				modulelink3: 'runs in the background.'
			},
			footer: {
				col_1: {
					title: 'einfachIOTA',
					link1: 'Website',
					link2: 'Blog',
					link3: 'Magazine'
				},
				col_2: {
					title: 'Partners',
					link1: 'TangleBay.org',
					link2: 'IOTAshop.com',
					link3: 'iota-news.com'
				},
				col_3: {
					title: 'IOTA',
					link1: 'Offcial Website',
					link2: 'Ecosystem',
					link3: 'Blog'
				},
				copyright: 'Made with',
				imprint: 'Imprint',
				privacy: 'Privacy Policy'
			}
		},
		de: {
			headline: 'IOTA Devnet Faucet',
			subheadline: 'Sende einfach IOTA',
			iota_is_free: 'IOTA ist gebührenfrei!',
			tx_on_thetangle: 'Verfolge die Transaktion auf',
			get_free_iota: 'Devnet IOTA anfordern!',
			how_it_works: 'Wie funktioniert das Faucet?',
			available_tokens: 'Verfügbare Tokens:',
			fill: 'Fülle das Faucet',
			spend_iota: 'nodeSpende IOTA',
			transaction_address: 'Du kannst die Transaktion auf',
			transaction_address1: 'verfolgen.',
			transaction_sent: 'Transaktion gesendet:',
			data_without_token: 'Daten können ohne den Besitz von IOTA Token versendet werden!',
			form: {
				address_label: 'Adresse',
				amount: 'Menge',
				message: 'Nachricht',
				message_placeholder: 'Nachricht (optional)',
			},
			about: {
				heading: 'Das IOTA Faucet erklärt',
				subheading: 'Sende einfach IOTA Tokens!',
				faucetlink: 'Faucet Code auf Github.',
				modulelink1: 'Im Hintergrund läuft das',
				modulelink2: ' iota-payment Module',
				modulelink3: '.'
			},
			footer: {
				col_1: {
					title: 'einfachIOTA',
					link1: 'Webseite',
					link2: 'Blog',
					link3: 'Magazin'
				},
				col_2: {
					title: 'Partner',
					link1: 'TangleBay.org',
					link2: 'IOTAshops.com',
					link3: 'iota-news.com'
				},
				col_3: {
					title: 'IOTA',
					link1: 'Offizielle Webseite',
					link2: 'Ökosystem',
					link3: 'Blog'
				},
				copyright: 'Gemacht mit',
				imprint: 'Impressum',
				privacy: 'Datenschutz'
			}
		}
	}
});