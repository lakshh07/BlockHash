const recommendProfiles = `
query RecommendedProfiles {
    recommendedProfiles {
          id
        name
        bio
        attributes {
          displayType
          traitType
          key
          value
        }
        metadata
        isDefault
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        dispatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          ... on ProfileFollowModuleSettings {
           type
          }
          ... on RevertFollowModuleSettings {
           type
          }
        }
    }
  }
`;

const getProfileByHandle = `
query Profiles($handle: Handle!) {
    profiles(request: { handles: [$handle], limit: 1 }) {
      items {
        id
        name
        bio
        attributes {
          displayType
          traitType
          key
          value
        }
        metadata
        isDefault
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        dispatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          ... on ProfileFollowModuleSettings {
           type
          }
          ... on RevertFollowModuleSettings {
           type
          }
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
`;

const getProfiles = `
query Profiles($id: ProfileId!) {
    profiles(request: { profileIds: [$id], limit: 1 }) {
      items {
        id
        name
        bio
        attributes {
          displayType
          traitType
          key
          value
        }
        metadata
        isDefault
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        dispatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          ... on ProfileFollowModuleSettings {
           type
          }
          ... on RevertFollowModuleSettings {
           type
          }
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
`;

const getPublication = `
    query($request: PublicationQueryRequest!){
        publication(request: $request) {
        __typename 
        ... on Post {
            ...PostFields
        }
        ... on Comment {
            ...CommentFields
        }
        ... on Mirror {
            ...MirrorFields
        }
        }
    }
    
    fragment MediaFields on Media {
        url
        mimeType
    }
    
    fragment ProfileFields on Profile {
        id
        name
        bio
        attributes {
        displayType
        traitType
        key
        value
        }
        metadata
        isDefault
        handle
        picture {
        ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
        }
        ... on MediaSet {
            original {
            ...MediaFields
            }
        }
        }
        coverPicture {
        ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
        }
        ... on MediaSet {
            original {
            ...MediaFields
            }
        }
        }
        ownedBy
        dispatcher {
        address
        }
        stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
        }
        followModule {
        ... on FeeFollowModuleSettings {
            type
            amount {
            asset {
                name
                symbol
                decimals
                address
            }
            value
            }
            recipient
        }
        ... on ProfileFollowModuleSettings {
        type
        }
        ... on RevertFollowModuleSettings {
        type
        }
        }
    }
    
    fragment PublicationStatsFields on PublicationStats { 
        totalAmountOfMirrors
        totalAmountOfCollects
        totalAmountOfComments
    }
    
    fragment MetadataOutputFields on MetadataOutput {
        name
        description
        content
        media {
        original {
            ...MediaFields
        }
        }
        attributes {
        displayType
        traitType
        value
        }
    }
    
    fragment Erc20Fields on Erc20 {
        name
        symbol
        decimals
        address
    }
    
    fragment CollectModuleFields on CollectModule {
        __typename
        ... on FreeCollectModuleSettings {
        type
        }
        ... on FeeCollectModuleSettings {
        type
        amount {
            asset {
            ...Erc20Fields
            }
            value
        }
        recipient
        referralFee
        }
        ... on LimitedFeeCollectModuleSettings {
        type
        collectLimit
        amount {
            asset {
            ...Erc20Fields
            }
            value
        }
        recipient
        referralFee
        }
        ... on LimitedTimedFeeCollectModuleSettings {
        type
        collectLimit
        amount {
            asset {
            ...Erc20Fields
            }
            value
        }
        recipient
        referralFee
        endTimestamp
        }
        ... on RevertCollectModuleSettings {
        type
        }
        ... on TimedFeeCollectModuleSettings {
        type
        amount {
            asset {
            ...Erc20Fields
            }
            value
        }
        recipient
        referralFee
        endTimestamp
        }
    }
    
    fragment PostFields on Post {
        id
        profile {
        ...ProfileFields
        }
        stats {
        ...PublicationStatsFields
        }
        metadata {
        ...MetadataOutputFields
        }
        createdAt
        collectModule {
        ...CollectModuleFields
        }
        referenceModule {
        ... on FollowOnlyReferenceModuleSettings {
            type
        }
        }
        appId
    }
    
    fragment MirrorBaseFields on Mirror {
        id
        profile {
        ...ProfileFields
        }
        stats {
        ...PublicationStatsFields
        }
        metadata {
        ...MetadataOutputFields
        }
        createdAt
        collectModule {
        ...CollectModuleFields
        }
        referenceModule {
        ... on FollowOnlyReferenceModuleSettings {
            type
        }
        }
        appId
    }
    
    fragment MirrorFields on Mirror {
        ...MirrorBaseFields
        mirrorOf {
        ... on Post {
            ...PostFields          
        }
        ... on Comment {
            ...CommentFields          
        }
        }
    }
    
    fragment CommentBaseFields on Comment {
        id
        profile {
        ...ProfileFields
        }
        stats {
        ...PublicationStatsFields
        }
        metadata {
        ...MetadataOutputFields
        }
        createdAt
        collectModule {
        ...CollectModuleFields
        }
        referenceModule {
        ... on FollowOnlyReferenceModuleSettings {
            type
        }
        }
        appId
    }
    
    fragment CommentFields on Comment {
        ...CommentBaseFields
        mainPost {
        ... on Post {
            ...PostFields
        }
        ... on Mirror {
            ...MirrorBaseFields
            mirrorOf {
            ... on Post {
                ...PostFields          
            }
            ... on Comment {
                ...CommentMirrorOfFields        
            }
            }
        }
        }
    }
    
    fragment CommentMirrorOfFields on Comment {
        ...CommentBaseFields
        mainPost {
        ... on Post {
            ...PostFields
        }
        ... on Mirror {
            ...MirrorBaseFields
        }
        }
    }
`;

const getPublications = `
  query Publications($id: ProfileId!, $limit: LimitScalar) {
    publications(request: {
      profileId: $id,
      publicationTypes: [POST, COMMENT, MIRROR],
      limit: $limit,
      sources: ["BlockHash"]
    }) {
        items {
          __typename 
          ... on Post {
            ...PostFields
          }
          ... on Comment {
            ...CommentFields
          }
          ... on Mirror {
            ...MirrorFields
          }
        }
        pageInfo {
          prev
          next
          totalCount
        }
      }
    }
    
    fragment MediaFields on Media {
      url
      mimeType
    }
    
    fragment ProfileFields on Profile {
      id
      name
      bio
      attributes {
         displayType
         traitType
         key
         value
       }
      metadata
      isDefault
      handle
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            ...MediaFields
          }
        }
      }
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            ...MediaFields
          }
        }
      }
      ownedBy
      dispatcher {
        address
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      followModule {
        ... on FeeFollowModuleSettings {
          type
          amount {
            asset {
              name
              symbol
              decimals
              address
            }
            value
          }
          recipient
        }
        ... on ProfileFollowModuleSettings {
         type
        }
        ... on RevertFollowModuleSettings {
         type
        }
      }
    }
    
    fragment PublicationStatsFields on PublicationStats { 
      totalAmountOfMirrors
      totalAmountOfCollects
      totalAmountOfComments
    }
    
    fragment MetadataOutputFields on MetadataOutput {
      name
      description
      content
      media {
        original {
          ...MediaFields
        }
      }
      attributes {
        displayType
        traitType
        value
      }
    }
    
    fragment Erc20Fields on Erc20 {
      name
      symbol
      decimals
      address
    }
    
    fragment CollectModuleFields on CollectModule {
      __typename
      ... on FreeCollectModuleSettings {
          type
          followerOnly
          contractAddress
      }
      ... on FeeCollectModuleSettings {
        type
        amount {
          asset {
            ...Erc20Fields
          }
          value
        }
        recipient
        referralFee
      }
      ... on LimitedFeeCollectModuleSettings {
        type
        collectLimit
        amount {
          asset {
            ...Erc20Fields
          }
          value
        }
        recipient
        referralFee
      }
      ... on LimitedTimedFeeCollectModuleSettings {
        type
        collectLimit
        amount {
          asset {
            ...Erc20Fields
          }
          value
        }
        recipient
        referralFee
        endTimestamp
      }
      ... on RevertCollectModuleSettings {
        type
      }
      ... on TimedFeeCollectModuleSettings {
        type
        amount {
          asset {
            ...Erc20Fields
          }
          value
        }
        recipient
        referralFee
        endTimestamp
      }
    }
    
    fragment PostFields on Post {
      id
      profile {
        ...ProfileFields
      }
      stats {
        ...PublicationStatsFields
      }
      metadata {
        ...MetadataOutputFields
      }
      createdAt
      collectModule {
        ...CollectModuleFields
      }
      referenceModule {
        ... on FollowOnlyReferenceModuleSettings {
          type
        }
      }
      appId
    }
    
    fragment MirrorBaseFields on Mirror {
      id
      profile {
        ...ProfileFields
      }
      stats {
        ...PublicationStatsFields
      }
      metadata {
        ...MetadataOutputFields
      }
      createdAt
      collectModule {
        ...CollectModuleFields
      }
      referenceModule {
        ... on FollowOnlyReferenceModuleSettings {
          type
        }
      }
      appId
    }
    
    fragment MirrorFields on Mirror {
      ...MirrorBaseFields
      mirrorOf {
       ... on Post {
          ...PostFields          
       }
       ... on Comment {
          ...CommentFields          
       }
      }
    }
    
    fragment CommentBaseFields on Comment {
      id
      profile {
        ...ProfileFields
      }
      stats {
        ...PublicationStatsFields
      }
      metadata {
        ...MetadataOutputFields
      }
      createdAt
      collectModule {
        ...CollectModuleFields
      }
      referenceModule {
        ... on FollowOnlyReferenceModuleSettings {
          type
        }
      }
      appId
    }
    
    fragment CommentFields on Comment {
      ...CommentBaseFields
      mainPost {
        ... on Post {
          ...PostFields
        }
        ... on Mirror {
          ...MirrorBaseFields
          mirrorOf {
            ... on Post {
               ...PostFields          
            }
            ... on Comment {
               ...CommentMirrorOfFields        
            }
          }
        }
      }
    }
    
    fragment CommentMirrorOfFields on Comment {
      ...CommentBaseFields
      mainPost {
        ... on Post {
          ...PostFields
        }
        ... on Mirror {
           ...MirrorBaseFields
        }
      }
    }
`;

const searchPublications = `query Search($query: Search!, $type: SearchRequestTypes!) {
  search(request: {
    query: $query,
    type: $type,
    limit: 10,
    sources: ["BlockHash"]
  }) {
    ... on PublicationSearchResult {
      __typename 
     items {
       __typename 
       ... on Comment {
         ...CommentFields
       }
       ... on Post {
         ...PostFields
       }
     }
     pageInfo {
       prev
       totalCount
       next
     }
   }
  }
}
fragment MediaFields on Media {
  url
  mimeType
}
fragment MirrorBaseFields on Mirror {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ... on FollowOnlyReferenceModuleSettings {
      type
    }
  }
  appId
}
fragment ProfileFields on Profile {
  profileId: id,
  name
  bio
  attributes {
     displayType
     traitType
     key
     value
  }
  metadata
  isDefault
  handle
  picture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
    }
  }
  coverPicture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
    }
  }
  ownedBy
  dispatcher {
    address
  }
  stats {
    totalFollowers
    totalFollowing
    totalPosts
    totalComments
    totalMirrors
    totalPublications
    totalCollects
  }
  followModule {
    ... on FeeFollowModuleSettings {
      type
      amount {
        asset {
          name
          symbol
          decimals
          address
        }
        value
      }
      recipient
    }
    ... on ProfileFollowModuleSettings {
     type
    }
    ... on RevertFollowModuleSettings {
     type
    }
  }
}
fragment PublicationStatsFields on PublicationStats { 
  totalAmountOfMirrors
  totalAmountOfCollects
  totalAmountOfComments
}
fragment MetadataOutputFields on MetadataOutput {
  name
  description
  content
  media {
    original {
      ...MediaFields
    }
  }
  attributes {
    displayType
    traitType
    value
  }
}
fragment Erc20Fields on Erc20 {
  name
  symbol
  decimals
  address
}
fragment CollectModuleFields on CollectModule {
  __typename
    ... on FreeCollectModuleSettings {
        type
    followerOnly
    contractAddress
  }
  ... on FeeCollectModuleSettings {
    type
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
  }
  ... on LimitedFeeCollectModuleSettings {
    type
    collectLimit
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
  }
  ... on LimitedTimedFeeCollectModuleSettings {
    type
    collectLimit
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
    endTimestamp
  }
  ... on RevertCollectModuleSettings {
    type
  }
  ... on TimedFeeCollectModuleSettings {
    type
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
    endTimestamp
  }
}
fragment PostFields on Post {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ... on FollowOnlyReferenceModuleSettings {
      type
    }
  }
  appId
}
fragment CommentBaseFields on Comment {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ... on FollowOnlyReferenceModuleSettings {
      type
    }
  }
  appId
}
fragment CommentFields on Comment {
  ...CommentBaseFields
  mainPost {
    ... on Post {
      ...PostFields
    }
    ... on Mirror {
      ...MirrorBaseFields
      mirrorOf {
        ... on Post {
           ...PostFields          
        }
        ... on Comment {
           ...CommentMirrorOfFields        
        }
      }
    }
  }
}
fragment CommentMirrorOfFields on Comment {
  ...CommentBaseFields
  mainPost {
    ... on Post {
      ...PostFields
    }
    ... on Mirror {
       ...MirrorBaseFields
    }
  }
}
`;

const searchProfiles = `
query($request: SearchQueryRequest!) {
  search(request: $request) 
    {
      ... on ProfileSearchResult {
        __typename 
        items {
          ... on Profile {
            ...ProfileFields
          }
        }
        pageInfo {
          prev
          totalCount
          next
        }
      }
    }
  }
  fragment MediaFields on Media {
    url
  }
  fragment ProfileFields on Profile {
    profileId: id,
    name
    bio
    attributes {
      displayType
      traitType
      key
      value
    }
    metadata
    isDefault
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
      }
    }
    stats {
      totalFollowers
      totalFollowing
    }
  }
`;

const explorePublications = `
  query ExplorePublications {
    explorePublications(request: {
      sortCriteria: LATEST,
      publicationTypes: [POST, MIRROR],
      sources: ["BlockHash"],
      timestamp: "2022-06-09T00:00:00.000Z"
    }) {
      items {
        __typename 
        ... on Post {
          ...PostFields
        }
        ... on Comment {
          ...CommentFields
        }
        ... on Mirror {
          ...MirrorFields
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }

  fragment MediaFields on Media {
    url
    width
    height
    mimeType
  }

  fragment ProfileFields on Profile {
    id
    name
    bio
    attributes {
      displayType
      traitType
      key
      value
    }
    metadata
    isDefault
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
        small {
          ...MediaFields
        }
        medium {
          ...MediaFields
        }
      }
    }
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
        small {
        ...MediaFields
        }
        medium {
          ...MediaFields
        }
      }
    }
    ownedBy
    dispatcher {
      address
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
    followModule {
      ... on FeeFollowModuleSettings {
        type
        amount {
          asset {
            name
            symbol
            decimals
            address
          }
          value
        }
        recipient
      }
      ... on ProfileFollowModuleSettings {
      type
      }
      ... on RevertFollowModuleSettings {
      type
      }
    }
  }

  fragment PublicationStatsFields on PublicationStats { 
    totalAmountOfMirrors
    totalAmountOfCollects
    totalAmountOfComments
  }

  fragment MetadataOutputFields on MetadataOutput {
    name
    description
    content
    media {
      original {
        ...MediaFields
      }
      small {
        ...MediaFields
      }
      medium {
        ...MediaFields
      }
    }
    attributes {
      displayType
      traitType
      value
    }
  }

  fragment Erc20Fields on Erc20 {
    name
    symbol
    decimals
    address
  }

  fragment CollectModuleFields on CollectModule {
    __typename
    ... on FreeCollectModuleSettings {
      type
    }
    ... on FeeCollectModuleSettings {
      type
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
    }
    ... on LimitedFeeCollectModuleSettings {
      type
      collectLimit
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
    }
    ... on LimitedTimedFeeCollectModuleSettings {
      type
      collectLimit
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
      endTimestamp
    }
    ... on RevertCollectModuleSettings {
      type
    }
    ... on TimedFeeCollectModuleSettings {
      type
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
      endTimestamp
    }
  }

  fragment PostFields on Post {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
  }

  fragment MirrorBaseFields on Mirror {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
  }

  fragment MirrorFields on Mirror {
    ...MirrorBaseFields
    mirrorOf {
    ... on Post {
        ...PostFields          
    }
    ... on Comment {
        ...CommentFields          
    }
    }
  }

  fragment CommentBaseFields on Comment {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ... on FollowOnlyReferenceModuleSettings {
        type
      }
    }
    appId
  }

  fragment CommentFields on Comment {
    ...CommentBaseFields
    mainPost {
      ... on Post {
        ...PostFields
      }
      ... on Mirror {
        ...MirrorBaseFields
        mirrorOf {
          ... on Post {
            ...PostFields          
          }
          ... on Comment {
            ...CommentMirrorOfFields        
          }
        }
      }
    }
  }

  fragment CommentMirrorOfFields on Comment {
    ...CommentBaseFields
    mainPost {
      ... on Post {
        ...PostFields
      }
      ... on Mirror {
        ...MirrorBaseFields
      }
    }
  }
`;

const getChallenge = `
  query Challenge($address: EthereumAddress!) {
    challenge(request: { address: $address }) {
      text
    }
  }
`;

const doesFollow = `
query($request: DoesFollowRequest!) {
  doesFollow(request: $request) { 
          followerAddress
      profileId
      follows
      }
}
`;

const getUsersNfts = `
  query($request: NFTsRequest!) {
    nfts(request: $request) {
      items {
        contractName
        contractAddress
        symbol
        tokenId
        owners {
          amount
          address
        }
        name
        description
        contentURI
        originalContent {
          uri
          metaType
        }
        chainId
        collectionName
        ercType
      }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}
`;
const getDefaultProfile = `
  query($request: DefaultProfileRequest!) {
    defaultProfile(request: $request) {
      id
      name
      bio
      attributes {
        displayType
        traitType
        key
        value
      }
      metadata
      isDefault
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      handle
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
        __typename
      }
      ownedBy
      dispatcher {
        address
        canUseRelay
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      followModule {
        ... on FeeFollowModuleSettings {
          type
          amount {
            asset {
              symbol
              name
              decimals
              address
            }
            value
          }
          recipient
        }
        ... on ProfileFollowModuleSettings {
         type
        }
        ... on RevertFollowModuleSettings {
         type
        }
      }
    }
  }
`;

const getComments = `
  query CommentFeed($request: PublicationsQueryRequest!) {
    publications(request: $request) {
      items {
        ... on Comment {
          ...CommentFields
        }
      }
      pageInfo {
        totalCount
        next
      }
    }
  }
  fragment CommentFields on Comment {
    id
    profile {
      ...MinimalProfileFields
    }
    collectedBy {
      address
      defaultProfile {
        handle
      }
    }
    collectModule {
      ...MinimalCollectModuleFields
    }
    stats {
      ...StatsFields
    }
    metadata {
      ...MetadataFields
    }
    commentOn {
      ... on Post {
        pubId: id
        profile {
          ...MinimalProfileFields
        }
        collectedBy {
          address
          defaultProfile {
            handle
          }
        }
        collectModule {
          ...MinimalCollectModuleFields
        }
        stats {
          ...StatsFields
        }
        metadata {
          ...MetadataFields
        }
        hidden
        createdAt
      }
      ... on Comment {
        id
        profile {
          ...MinimalProfileFields
        }
        collectedBy {
          address
          defaultProfile {
            handle
          }
        }
        collectModule {
          ...MinimalCollectModuleFields
        }
        metadata {
          ...MetadataFields
        }
        stats {
          ...StatsFields
        }
        mainPost {
          ... on Post {
            id
            profile {
              ...MinimalProfileFields
            }
            collectedBy {
              address
              defaultProfile {
                handle
              }
            }
            collectModule {
              ...MinimalCollectModuleFields
            }
            stats {
              ...StatsFields
            }
            metadata {
              ...MetadataFields
            }
            hidden
            createdAt
          }
          ... on Mirror {
            id
            profile {
              ...MinimalProfileFields
            }
            collectModule {
              ...MinimalCollectModuleFields
            }
            stats {
              ...StatsFields
            }
            metadata {
              ...MetadataFields
            }
            mirrorOf {
              ... on Post {
                id
                profile {
                  ...MinimalProfileFields
                }
                stats {
                  ...StatsFields
                }
                hidden
              }
              ... on Comment {
                id
                profile {
                  ...MinimalProfileFields
                }
                stats {
                  ...StatsFields
                }
                hidden
              }
            }
            createdAt
          }
        }
        hidden
        createdAt
      }
      ... on Mirror {
        id
        profile {
          ...MinimalProfileFields
        }
        metadata {
          ...MetadataFields
        }
        mirrorOf {
          ... on Post {
            id
            profile {
              ...MinimalProfileFields
            }
            stats {
              ...StatsFields
            }
            hidden
          }
          ... on Comment {
            id
            profile {
              ...MinimalProfileFields
            }
            stats {
              ...StatsFields
            }
            hidden
          }
        }
        stats {
          ...StatsFields
        }
        hidden
        createdAt
      }
    }
    hidden
    createdAt
    appId
  }
  fragment MinimalCollectModuleFields on CollectModule {
    ... on FreeCollectModuleSettings {
      type
    }
    ... on FeeCollectModuleSettings {
      type
      amount {
        asset {
          address
        }
      }
    }
    ... on LimitedFeeCollectModuleSettings {
      type
      amount {
        asset {
          address
        }
      }
    }
    ... on LimitedTimedFeeCollectModuleSettings {
      type
      amount {
        asset {
          address
        }
      }
    }
    ... on TimedFeeCollectModuleSettings {
      type
      amount {
        asset {
          address
        }
      }
    }
  }
  fragment MetadataFields on MetadataOutput {
    name
    description
    content
    media {
      original {
        url
        mimeType
      }
    }
    attributes {
      value
    }
  }
  fragment MinimalProfileFields on Profile {
    id
    name
    handle
    bio
    ownedBy
    attributes {
      key
      value
    }
    picture {
      ... on MediaSet {
        original {
          url
        }
      }
      ... on NftImage {
        uri
      }
    }
    followModule {
      __typename
    }
  }
  fragment StatsFields on PublicationStats {
    totalAmountOfMirrors
    totalAmountOfCollects
    totalAmountOfComments
  }
`;

const getProfileById = `
  query Profiles($id: ProfileId!) {
    profiles(request: { profileIds: [$id]}) {
      items {
        id
        name
        bio
        attributes {
          displayType
          traitType
          key
          value
        }
        metadata
        isDefault
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        dispatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          ... on ProfileFollowModuleSettings {
           type
          }
          ... on RevertFollowModuleSettings {
           type
          }
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
`;
/*
 * const doesFollowRequest = {
 *   followInfos: [{ followerAddress: EthereumAddress!, profileId: ProfileId! }]
 *  }
 */

export {
  recommendProfiles,
  getProfiles,
  getProfileByHandle,
  getProfileById,
  getDefaultProfile,
  getPublications,
  getPublication,
  getComments,
  searchProfiles,
  searchPublications,
  explorePublications,
  doesFollow,
  getChallenge,
  getUsersNfts,
};
