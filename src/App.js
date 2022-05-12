import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';

import { GlobalStyle } from './global.styles';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import CurrentUserContext from './contexts/current-user/current-user.context'
import CollectionsContext from './contexts/collections/collections.context'
import DirectoryContext from './contexts/directory/directory.context'

import { useFirebaseCollections, useFirebaseDirectory } from './firebase/useFirebase';

const App = () => {
	const [currentUser, setCurrentUser] = useState(null)
	const { loading: loadingCollections, collections } = useFirebaseCollections()
	const { loading: loadingDirectory, directory } = useFirebaseDirectory()
	
	useEffect(() => {
		const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot(snapShot => {
					setCurrentUser({
							id: snapShot.id,
							...snapShot.data()
						}
					);
				});
			}
			setCurrentUser(userAuth)
		});

		return () => {
			unsubscribeFromAuth();
		};
	}, [setCurrentUser]);

	return (
		<div>
			<GlobalStyle />
			<CurrentUserContext.Provider value={currentUser}>
				<Header />
			</CurrentUserContext.Provider>
			<Switch>
			{/* <Route exact path='/' component={HomePage} /> */}
			<Route exact 
				path='/' 
				render={(props) => (
					<DirectoryContext.Provider value={directory}>
						{loadingDirectory ? <Spinner /> : <HomePage {...props} />}
					</DirectoryContext.Provider>
				)}
			/>
			{/* <Route path='/shop' component={ShopPage} /> */}
			<Route 
				path='/shop' 
				render={(props) => (
					<CollectionsContext.Provider value={collections}>
						{ loadingCollections ? <Spinner /> : <ShopPage {...props} /> }
					</CollectionsContext.Provider>
				)}
			/>
			<Route exact path='/checkout' component={CheckoutPage} />
			<Route exact 
					path='/signin' 
					render={() => 
						currentUser ? (
							<Redirect to='/' />
						) : ( 
							<SignInAndSignUpPage />
						) 
					}
				/>
			</Switch>
		</div>
	);
};

export default App;