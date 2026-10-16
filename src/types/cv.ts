export interface Profile {
	network: string;
	username: string;
	url?: string;
}

export interface Location {
	address?: string;
	city?: string;
	countryCode?: string;
	region?: string;
}

export interface Basics {
	name: string;
	label: string;
	image?: string;
	email: string;
	phone?: string;
	summary: string;
	location: Location;
	profiles: Profile[];
}

export interface Work {
	name: string;
	position: string;
	location?: string;
	description?: string;
	url?: string;
	startDate: string;
	endDate?: string;
	summary: string;
	highlights: string[];
}

export interface Education {
	institution: string;
	url?: string;
	area: string;
	studyType?: string;
	startDate?: string;
	endDate?: string;
	score?: string;
	courses?: string[];
}

export interface Skill {
	name: string;
	level?: string;
	summary?: string;
	keywords: string[];
}

export interface Language {
	language: string;
	fluency: string;
	summary?: string;
}

export interface CV {
	basics: Basics;
	work: Work[];
	education: Education[];
	skills: Skill[];
	languages: Language[];
}
