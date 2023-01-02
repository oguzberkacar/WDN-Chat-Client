import React, { Component, useEffect, useState } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip, Form, Label, Input, InputGroup } from 'reactstrap';
import SimpleBar from 'simplebar-react';

import { connect } from 'react-redux';

import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { setActiveChatId, addNewChat } from '../../../redux/actions';
import Cookies from 'js-cookie';

//use sortedContacts variable as global variable to sort contacts

function Contacts(props) {
	// geting users from backend and display it
	const [users, setUsers] = useState([]);
	const [followersId, setFollowersId] = useState([]);

	const token = Cookies.get('access_token');

	useEffect(() => {
		if (followersId.length > 0) {
			props.list.map((i, index) => {
				if (followersId.includes(i.user_id)) {
					setUsers((users) => [...users, i]);
				}
			});
		}
	}, [followersId]);

	// useEffect(() => {
	//   console.log(props.user);
	// }, [props.user]);

	useEffect(() => {
		if (props.user && props.user.ads_id && props.user.ads) {
			getFollowers(props.user.ads_id);
		}
	}, [props.user]);

	async function getFollowers(id) {
		var myHeaders = new Headers();
		myHeaders.append('Accept', 'application/json');
		myHeaders.append('Authorization', `Bearer ${token}`);
		myHeaders.append('Content-Type', 'application/json');
		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow',
		};
		await fetch(`https://api.devapp.one/ads/followers?ads_id=${id}`, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				// setUsers(result.result.data);
				result.result.data.map((i, index) => {
					setFollowersId((followersId) => [...followersId, i.follower_id]);
				});
			});
	}

	function handleChange(e) {
		var search = e.target.value;
		let conversation = users;
		let filteredArray = [];

		//find conversation name from array
		for (let i = 0; i < conversation.length; i++) {
			if (conversation[i].name.toLowerCase().includes(search) || conversation[i].name.toUpperCase().includes(search)) filteredArray.push(conversation[i]);
		}

		//set filtered items to state
		setUsers(filteredArray);

		//if input value is blanck then assign whole recent chatlist to array
		if (search === '') {
			props.contacts.map((user) => {
				setUsers((users) => [...users, user]);
			});
		}
	}

	// let usersList = [];

	function openUserChat(e, user) {
		e.preventDefault();
		console.log(user);
		props.chatList.map((i, index) => {
			if (i.away_user !== undefined && i.away_user.user_id == user.user_id) {
				// props.activeUser(user);
				props.setActiveChatId(i.chat_id);
				return;
			} else {
				console.log(props.user);
				let obj = {
					isNewMessage: true,
					chat_id: 'temp',
					last_message: {
						id: null,
						chat_id: null,
						from_id: props.user.id,
						to_id: user.user_id,
						message: '',
						is_seen: '0',
						is_channel: '0',
						created_at: null,
						updated_at: null,
					},
					away_user: {
						id: null,
						user_id: user.user_id,
						user_chat_id: user.user_chat_id,
						status: null,
						is_online: null,
						last_seen: null,
						avatar: null,
						showname: user.showname,
						age: user.age,
						city: user.city,
						country: user.country,
						role_id: user.role_id,
						gender_id: user.gender_id,
						created_at: null,
						updated_at: null,
						deleted_at: null,
					},
					counter: null,
					created_at: null,
					id: null,
					home_user: props.user,
					messages: {
						current_page: 1,
						data: [
							{
								id: null,
								chat_id: null,
								from_id: props.user.id,
								to_id: user.user_id,
								message: 'Send your first message.',
								is_seen: '0',
								is_channel: '0',
								created_at: null,
								updated_at: null,
							},
						],
						first_page_url: 'https://chat.spapp.click/api/chatDetail?page=1',
						from: 1,
						last_page: 1,
						last_page_url: 'https://chat.spapp.click/api/chatDetail?page=1',
						next_page_url: 'https://chat.spapp.click/api/chatDetail?page=1',
						path: 'https://chat.spapp.click/api/chatDetail',
						per_page: 10,
						prev_page_url: null,
						to: 1,
						total: 1,
					},
					updated_at: null,
					users: null,
					users_deleted_info: null,
				};

				console.log(obj);
				props.addNewChat(obj);
				props.setActiveChatId('temp');
			}
		});
	}

	const { t } = props;

	return (
		<React.Fragment>
			<div>
				<div className="p-4">
					{/* Needs Translate */}
					<h4 className="mb-4">{t('Followers')}</h4>
				</div>

				<SimpleBar style={{ maxHeight: '100%' }} className="p-4 chat-message-list chat-group-list">
					{props.user && props.user.ads ? (
						users !== undefined &&
						users.map((user, key) => (
							<ul key={key} className="list-unstyled chat-list">
								<li key={key}>
									<Link to="#" onClick={(e) => openUserChat(e, user)}>
										<div className="d-flex align-items-center">
											<div className="chat-user-img me-3 ms-0">
												{/* <div className="avatar-xs">
                            <span className="avatar-title rounded-circle wdncolor text-white">
                              {user && user.showname.charAt(1).toUpperCase()}
                            </span>
                          </div> */}
												{user.avatar == null ? (
													<div className={'chat-user-img ' + ' align-self-center me-3 ms-0'}>
														<div className="avatar-xs">
															<span className="avatar-title rounded-circle wdncolor text-white">{user.showname.charAt(0).toUpperCase()}</span>
														</div>
														{user.status && <span className="user-status"></span>}
													</div>
												) : (
													<div className={'chat-user-img ' + ' align-self-center me-3 ms-0'}>
														<div className="avatar-xs">
															<img
																src={user.avatar}
																alt=""
																className="rounded-circle onlineuseravatar"
																onError={() => {
																	let copy = [...users];
																	copy[key].avatar = null;
																	setUsers(copy);
																}}
															/>
														</div>
													</div>
												)}
											</div>
											<h5 className="text-truncate font-size-14 mb-0">{user.showname}</h5>
										</div>
									</Link>
								</li>{' '}
							</ul>
						))
					) : (
						<div>
							<h5 className="text-center">Create an Ads account for see the followers.</h5>
						</div>
					)}
				</SimpleBar>
				{/* end contact lists */}
			</div>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	const { contacts, active_user } = state.Chat;
	const { user } = state.Auth;
	const list = state.Chat.online_user_list;
	const { activeChatId } = state.Chat;
	const { chatList } = state.Chat;

	return { contacts, active_user, user, list, chatList, activeChatId };
};

export default connect(mapStateToProps, { setActiveChatId, addNewChat })(withTranslation()(Contacts));
